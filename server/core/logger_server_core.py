import logging

def init_logger():
    # Настройка логгера
    log = logging.getLogger(__name__)
    log.setLevel(logging.INFO)

    # Обработчик для записи в файл
    file_handler = logging.FileHandler('server/core/server_log.log')
    file_handler.setLevel(logging.INFO)

    # Форматтер
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(filename)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)

    # Добавление обработчика
    log.addHandler(file_handler)
    return log

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