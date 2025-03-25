import logging


def clear_handlers(logger):
    '''
    Удаление всех обработчиков у логгера
    '''
    for handler in logger.handlers[:]:
        logger.removeHandler(handler)


def init_logger(name):
    # Настройка логгера
    log = logging.getLogger(name)
    log.setLevel(logging.INFO)

    # Удаляем старые обработчики
    clear_handlers(log)

    # Обработчик для записи в файл
    try:
        file_handler = logging.FileHandler('server/core/server_log.log')
    except Exception as ex:
        print(ex)
        return None
    file_handler.setLevel(logging.INFO)

    # Форматтер
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)

    # Добавление обработчика
    log.addHandler(file_handler)
    return log

def info(name, msg):
    log = init_logger(name)
    log.info(msg)

def debug(name, msg): 
    log = init_logger(name)
    log.debug(msg)

def warning(name, msg):
    log = init_logger(name)
    log.warning(msg)

def error(name, msg):
    log = init_logger(name)
    log.error(msg)

def cricital(name, msg):
    log = init_logger(name)
    log.critical(msg)

    
# Экспорт
__all__ = [info, debug, warning, error, cricital]