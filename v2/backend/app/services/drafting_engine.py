from abc import ABC, abstractmethod

from app.services.draft_service import generate_draft_reply


class DraftingEngine(ABC):
    @abstractmethod
    def generate(self, email_body: str) -> dict:
        pass


class RuleBasedDraftingEngine(DraftingEngine):
    def generate(self, email_body: str) -> dict:
        return generate_draft_reply(email_body)

class LLMDraftingEngine(DraftingEngine):
    def generate(self, email_body: str) -> dict:
        return{
            "draft": "This is a placeholder LLM-generated draft. Real LLM integration coming next.",
            "confidence": 0.6,
            "intent": "llm_placeholder",
            "needs_review": True
        }
