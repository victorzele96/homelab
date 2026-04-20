from pydantic import BaseModel, Field, HttpUrl
from typing import Optional

class JobApplicationCreate(BaseModel):
    company_name: str = Field(..., min_length=1)
    job_title: str = Field(..., min_length=1)
    job_link: HttpUrl
    status: Optional[str] = "Applied"
    notes: Optional[str] = Field(None, description="Any significant tools or interview notes")

    class Config:
        from_attributes = True