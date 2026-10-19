# ShouTech ERP — C Engine Makefile
CC ?= gcc
CFLAGS ?= -O3 -Wall -Wextra -fPIC -std=c99
TARGET_LIB = libshoutech.so
TARGET_STATIC = libshoutech.a

all: $(TARGET_LIB) $(TARGET_STATIC)

$(TARGET_LIB): shoutech_core.o
	$(CC) -shared -o $@ $^

$(TARGET_STATIC): shoutech_core.o
	ar rcs $@ $^

shoutech_core.o: shoutech_core.c shoutech_core.h
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f *.o $(TARGET_LIB) $(TARGET_STATIC)

.PHONY: all clean
