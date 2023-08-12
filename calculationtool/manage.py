#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

from django.contrib.auth.models import User
from calculationtool.settings import ADMIN_EMAIL, ADMIN_PASSWORD


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'calculationtool.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    user = User.objects.create_user("john", ADMIN_EMAIL, ADMIN_PASSWORD)
    main()
