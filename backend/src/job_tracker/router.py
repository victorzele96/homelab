from fastapi import APIRouter, HTTPException, status
from .controller import JobTrackerController
from .models import JobApplicationCreate # Pydantic model



router = APIRouter()
controller = JobTrackerController()

@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_job(job_id: int):
    """
    Deleting a job by it's id.
    """
    try:
        result = controller.remove_job(job_id)

        # if not result:
        #     raise HTTPException(
        #         status_code=status.HTTP_404_NOT_FOUND, 
        #         detail=f"Job node {job_id} not found"
        #     )

    except Exception as e:
        print(f"DEBUG: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.put("/{job_id}", status_code=status.HTTP_200_OK)
async def update_job(job_id: int, updated_data: JobApplicationCreate):
    try:
        data_dict = updated_data.model_dump(mode='json')
        result = controller.update_application(job_id, data_dict)
        if not result:
            raise HTTPException(status_code=404, detail="Job not found")
        return {"message": "Update Successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/add", status_code=status.HTTP_201_CREATED)
async def add_job(job_data: JobApplicationCreate):
    """
    Endpoint to add a new job application.
    The job_data is validated by the Pydantic model before reaching this logic.
    """
    try:
        # Converting the Pydantic model to a dictionary.
        # model_dump(mode='json') ensures HttpUrl is converted to a string.
        data_dict = job_data.model_dump(mode='json')
        
        result = controller.add_application(data_dict)
        
        if result:
            return {"status": "success", "message": "Application added successfully"}
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                detail="Failed to save application to the database"
            )
            
    except Exception as e:
        # Logging the error could be a great next step for your DevOps monitoring
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))



@router.get("/all")
async def get_all_jobs():
    """
    Retrieves all job applications.
    This is what your React frontend will call to populate the table/view.
    """
    try:
        jobs = controller.get_all_applications()
        return jobs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))