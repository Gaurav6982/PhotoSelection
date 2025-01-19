import os
import shutil
import json

def copy_file(source_dir, target_dir, fileName):
    try:
        # Ensure the source directory exists
        if not os.path.exists(source_dir):
            print(f"Source directory '{source_dir}' does not exist.")
            return

        # Create the target directory if it does not exist
        os.makedirs(target_dir, exist_ok=True)

        # Copy files from the source to the target directory
        source_file = os.path.join(source_dir, fileName)
        target_file = os.path.join(target_dir, fileName)

        if os.path.isfile(source_file):
            shutil.copy2(source_file, target_file)  # Preserves metadata
            print(f"Copied: {source_file} -> {target_file}")

        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Replace these paths with your source and target directories
    with open("selection.json", "r") as file:
        json_content = json.load(file)
    print(json_content)
    for fileName, folderName in json_content.items():
        copy_file("./images", folderName, fileName)
    print("All files copied successfully.")
