from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)
CORS(app)

# Database setup
DATABASE_URL = "postgresql://postgres:password@db:5432/todos"
engine = create_engine(DATABASE_URL)
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Todo model
class Todo(Base):
    __tablename__ = "todo"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    completed = Column(Boolean, default=False)

Base.metadata.create_all(bind=engine)

# Routes
@app.route("/api/todos", methods=["GET"])
def get_todos():
    session = SessionLocal()
    todos = session.query(Todo).all()
    session.close()
    return jsonify([{"id": t.id, "title": t.title, "completed": t.completed} for t in todos])

@app.route("/api/todos", methods=["POST"])
def add_todo():
    session = SessionLocal()
    data = request.json
    todo = Todo(title=data["title"])
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return jsonify({"id": todo.id, "title": todo.title, "completed": todo.completed}), 201

@app.route("/api/todos/<int:todo_id>", methods=["PUT"])
def update_todo(todo_id):
    session = SessionLocal()
    todo = session.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        return jsonify({"error": "Task not found"}), 404
    data = request.json
    todo.completed = data.get("completed", todo.completed)
    session.commit()
    session.close()
    return jsonify({"id": todo.id, "title": todo.title, "completed": todo.completed})

@app.route("/api/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    session = SessionLocal()
    todo = session.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        return jsonify({"error": "Task not found"}), 404
    session.delete(todo)
    session.commit()
    session.close()
    return jsonify({"message": "Task deleted!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)