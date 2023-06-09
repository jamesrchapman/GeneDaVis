cmake_minimum_required(VERSION 3.15)
project(UCSCGenomePlugin)

set(CMAKE_CXX_STANDARD 11)

set(CMAKE_EXECUTABLE_SUFFIX ".wasm")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s WASM=1 -s SIDE_MODULE=1")

add_executable(backend backend.cpp)
