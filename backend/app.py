from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="../frontend/build", static_url_path="")
CORS(app)  # Enable Cross-Origin Resource Sharing

# In-memory storage for tasks
tasks = []

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def static_proxy(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.isfile(file_path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

@app.route("/api/todos", methods=["GET"])
def get_todos():
    return jsonify(tasks)

@app.route("/api/todos", methods=["POST"])
def add_todo():
    try:
        data = request.json
        task = {"id": len(tasks) + 1, "title": data["title"], "completed": False}
        tasks.append(task)
        return jsonify(task), 201
    except Exception as e:
        print(f"Error in POST /api/todos: {e}")
        return jsonify({"error": "Failed to add task"}), 500

@app.route("/api/todos/<int:task_id>", methods=["PUT"])
def update_todo(task_id):
    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = request.json.get("completed", task["completed"])
            return jsonify(task)
    return jsonify({"error": "Task not found"}), 404

@app.route("/api/todos/<int:task_id>", methods=["DELETE"])
def delete_todo(task_id):
    global tasks
    tasks = [task for task in tasks if task["id"] != task_id]
    return jsonify({"message": "Task deleted!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)