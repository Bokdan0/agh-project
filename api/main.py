from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from api import customers

app = FastAPI()

class StudentCreateSchema(BaseModel):
    first_name: str
    last_name: str

    class Config:
        schema_extra = {
            "example": {
                "first_name": "Jerzetta",
                "last_name": "Kłosińska",
            }
        }

class StudentUpdateSchema(BaseModel):
    first_name: str
    last_name: str

    class Config:
        schema_extra = {
            "example": {
                "first_name": "Grzegorz",
                "last_name": "Brzęczyszczykiewicz",
            }
        }


class Student(BaseModel):
    id: int
    first_name: str
    last_name: str

STUDENTS = {}

@app.put("/student/{student_id}")
async def update_student(student_id: int, student:StudentUpdateSchema):
    STUDENTS[id] = Student(**Student.dict(), id = student_id)
    return {"update_student"}

@app.get("/students")
async def get_students():
    return STUDENTS

@app.post("/students")
async def create_student(student: StudentCreateSchema):
    id = len(STUDENTS) + 1
    new_student = Student(**student.dict(), id=id)
    STUDENTS[id] = new_student
    return new_student


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(customers.router, prefix="/customers")
#hakowanie pentagonu: python -m uvicorn api.main:app --reload