const WebSocket = require("ws");

function createHumeProxy(server) {
  const wss = new WebSocket.Server({
    server,
    path: "/hume-proxy",
  });

  wss.on("connection", function connection(clientWs, request) {
    console.log("Client connected to Hume proxy from:", request.headers.origin);

    let humeWs = null;
    let apiKey = null;

    clientWs.on("message", function message(data) {
      try {
        const parsedData = JSON.parse(data);

        // Check if this is an authentication message
        if (parsedData.type === "auth" && parsedData.apiKey) {
          apiKey = parsedData.apiKey;

          // Connect to Hume API using query parameter (browser-compatible)
          const humeUrl = `wss://api.hume.ai/v0/stream/models?apiKey=${encodeURIComponent(
            apiKey
          )}`;
          console.log(
            "🔑 Connecting to Hume API with query parameter authentication"
          );
          humeWs = new WebSocket(humeUrl);

          humeWs.on("open", function open() {
            console.log("Connected to Hume API");
            clientWs.send(JSON.stringify({ type: "connected" }));
          });

          humeWs.on("message", function message(humeData) {
            // Forward Hume API response to client
            console.log(
              "📨 Received from Hume API, data type:",
              typeof humeData,
              "size:",
              humeData.length || "unknown"
            );

            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(humeData);
            } else {
              console.warn(
                "⚠️ Client WebSocket not open, cannot forward Hume response"
              );
            }
          });

          humeWs.on("error", function error(err) {
            console.error("Hume WebSocket error:", err);
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(
                JSON.stringify({
                  error: "Connection to Hume API failed",
                  type: "error",
                })
              );
            }
          });

          humeWs.on("close", function close() {
            console.log("Hume WebSocket closed");
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(
                JSON.stringify({
                  type: "disconnected",
                })
              );
            }
          });

          return;
        }

        // Forward other messages to Hume API
        if (humeWs && humeWs.readyState === WebSocket.OPEN) {
          try {
            // Validate JSON before forwarding
            const payload = JSON.parse(data);
            console.log("📤 Forwarding to Hume API:", {
              hasData: !!payload.data,
              hasModels: !!payload.models,
              dataLength: payload.data ? payload.data.length : 0,
              streamWindow: payload.stream_window_ms,
            });

            humeWs.send(data);
          } catch (parseError) {
            console.error("❌ Invalid JSON from client:", parseError);
            clientWs.send(
              JSON.stringify({
                error: "Invalid JSON payload from client",
                type: "error",
              })
            );
          }
        } else {
          console.warn(
            "⚠️ Hume WebSocket not ready, state:",
            humeWs?.readyState
          );
          clientWs.send(
            JSON.stringify({
              error: "Not connected to Hume API. Please authenticate first.",
              type: "error",
            })
          );
        }
      } catch (err) {
        console.error("Error parsing message:", err);
        clientWs.send(
          JSON.stringify({
            error: "Invalid message format",
            type: "error",
          })
        );
      }
    });

    clientWs.on("close", function close() {
      console.log("Client disconnected from Hume proxy");
      if (humeWs) {
        humeWs.close();
      }
    });

    clientWs.on("error", function error(err) {
      console.error("Client WebSocket error:", err);
      if (humeWs) {
        humeWs.close();
      }
    });
  });

  return wss;
}

module.exports = createHumeProxy;
