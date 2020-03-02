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


def log_visit(is_auth):
    tracker = models.Tracker()
    tracker.is_auth = is_auth
    tracker.save()


def log_error(exception, message=None):
    logger = models.Logger()
    if message is not None:
        message = str(message)
    logger.message = message
    logger.exception = str(exception)
    logger.code = 1
    logger.date = datetime.datetime.now(tz=timezone.utc)
    logger.save()


def get_all_events():
    retval = []
    try:
        entry_set = list(models.Logger.objects.values())
        for entry in entry_set:
            entry = {'message': entry['message'], 'exception': entry['exception'], 'code': entry['code'], 'date': entry['date']}
            retval.append(entry)
        print(retval)
    except Exception as e:
        print(e)
    return retval


def get_all_trackers():
    retval = []
    try:
        entry_set = models.Tracker.objects
        is_auth = entry_set.filter(is_auth=True).count()
        total = entry_set.count()
        num = float(is_auth/total)*100
        return num
    except Exception as e:
        print("error mate")

