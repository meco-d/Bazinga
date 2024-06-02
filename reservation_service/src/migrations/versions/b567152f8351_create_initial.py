"""create_initial

Revision ID: b567152f8351
Revises: 
Create Date: 2024-06-01 14:22:10.634067

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b567152f8351'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "reservation",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("user_id", sa.Integer),
        sa.Column("charger_id", sa.Integer),
        sa.Column("active", sa.Boolean),
        sa.Column("start_time", sa.DateTime),
        sa.Column("end_time", sa.DateTime),
        sa.Column(
            "created_at", sa.DateTime, nullable=False, server_default=sa.func.now()
        ),
        sa.Column(
            "updated_at",
            sa.DateTime,
            nullable=False,
            server_default=sa.func.now(),
            onupdate=sa.func.now(),
        ),
    )
    pass


def downgrade() -> None:
    op.drop_table("reservation")
