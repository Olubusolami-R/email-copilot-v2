from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    drafting_engine: str = "rule_based"
    llm_provider: str= "placeholder"
    model_name: str="placeholder_model"
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()

