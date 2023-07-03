from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from api import customers

app = FastAPI()



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

#najpierw odpala się backend
#potem na drugim terminalu wchodzi cd fronted
#i na koniec odpala to komendą npm run dev