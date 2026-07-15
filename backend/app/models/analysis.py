from sqlalchemy import Column, Integer, String, Text, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func

from app.database.database import Base


class AnalysisHistory(Base):
    __tablename__ = "analysis_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    website_url = Column(Text, nullable=False)
    seo_score = Column(Integer)

    title = Column(Text)
    description = Column(Text)
    screenshot = Column(Text)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )