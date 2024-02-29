#!/bin/bash

# Function to recursively search for HTML files and edit them
function edit_html_files() {
    # Loop through all files and directories in the current directory
    for item in "$1"/*; do
        if [[ -d "$item" ]]; then
            # If it's a directory, recursively call the function
            edit_html_files "$item"
        elif [[ -f "$item" && "$item" == *.html ]]; then
            # If it's a file and has .html extension, edit it
            sed -i 's/Copyright 2021/Copyright 2024/g' "$item"
            echo "Edited: $item"
        fi
    done
}

# Start editing HTML files from the current directory
edit_html_files "$(pwd)"

