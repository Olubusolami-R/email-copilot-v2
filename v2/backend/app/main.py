from fastapi import FastAPI

from app.schemas import DraftReplyRequest, DraftReplyResponse
from app.services.drafting_engine import RuleBasedDraftingEngine


app = FastAPI(title="EmailCopilot API")
drafting_engine=RuleBasedDraftingEngine()

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.post("/draft-reply", response_model=DraftReplyResponse)
def draft_reply(request: DraftReplyRequest):
    return drafting_engine.generate(request.email_body)