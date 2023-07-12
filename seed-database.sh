#!/bin/bash

env=${1:-dev}

yarn migrate:up:$env