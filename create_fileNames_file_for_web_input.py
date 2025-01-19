import os
import json
import argparse

def list_files_to_json(directory, output_file):
    try:
        # Get list of files in the directory
        files = os.listdir(directory)
        file_list = [file for file in files if os.path.isfile(os.path.join(directory, file))]

        # Write the file list to a JSON file
        with open(output_file, 'w') as json_file:
            json.dump(file_list, json_file, indent=4)

        print(f"File names have been written to {output_file}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    list_files_to_json("./images", "fileNamesArray.json")
