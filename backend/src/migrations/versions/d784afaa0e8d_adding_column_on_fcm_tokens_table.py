"""adding column on fcm_tokens table

Revision ID: d784afaa0e8d
Revises: 81ad24a2ebd1
Create Date: 2024-05-21 23:56:28.011517

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "d784afaa0e8d"
down_revision: Union[str, None] = "81ad24a2ebd1"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "fcm_tokens",
        sa.Column(
            "updated_at", sa.DateTime, nullable=False, server_default=sa.func.now()
        ),
    )


def downgrade() -> None:
    op.drop_column("fcm_tokens", "updated_at")
