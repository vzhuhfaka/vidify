import logging


def clear_handlers(logger):
    '''
    Удаление всех обработчиков у логгера
    '''
    for handler in logger.handlers[:]:
        logger.removeHandler(handler)


def init_logger(name):
    """
    Настройка логгера
    """

    log = logging.getLogger(name)
    log.setLevel(logging.INFO)

    # Удаляем старые обработчики
    clear_handlers(log)

    # Обработчик для записи в файл

    file_handler = logging.FileHandler('server/core/server.log')

    file_handler.setLevel(logging.INFO)

    # Форматтер
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)

    # Добавление обработчика
    log.addHandler(file_handler)
    return log

def info(name, msg):
    """
    Для сообщения уровня INFO в логгер
    """
    log = init_logger(name)
    log.info(msg)

def debug(name, msg):
    """
    Для сообщения уровня DEBUG в логгер
    """
    log = init_logger(name)
    log.debug(msg)

def warning(name, msg):
    """
    Для сообщения уровня WARNING в логгер
    """
    log = init_logger(name)
    log.warning(msg)

def error(name, msg):
    """
    Для сообщения уровня ERROR в логгер
    """
    log = init_logger(name)
    log.error(msg)

def cricital(name, msg):
    """
    Для сообщения уровня CRITICAL в логгер
    """
    log = init_logger(name)
    log.critical(msg)

    
# Экспорт

def info(msg):
    log = init_logger()
    log.info(msg)

def debug(msg):
    log = init_logger()
    log.debug(msg)

def warning(msg):
    log = init_logger()
    log.warning(msg)

def error(msg):
    log = init_logger()
    log.error(msg)
def cricital(msg):
    log = init_logger()
    log.critical(msg)

    
# Экспорт логгера
__all__ = [info, debug, warning, error, cricital]