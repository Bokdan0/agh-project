from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import customers

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

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