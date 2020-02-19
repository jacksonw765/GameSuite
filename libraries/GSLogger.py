import datetime

from django.utils import timezone

from REST import models


def log_event(message):
    msg = str(message)
    logger = models.Logger()

    logger.message = msg
    logger.code = 0
    logger.date = datetime.datetime.now(tz=timezone.utc)
    logger.save()


def log_error(exception, message=None):
    logger = models.Logger()
    if message is not None:
        message = str(message)
    logger.message = message
    logger.exception = str(exception)
    logger.code = 1
    logger.date = datetime.datetime.now(tz=timezone.utc)
    logger.save()
