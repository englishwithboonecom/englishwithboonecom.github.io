import pandas as pd
import os
from gtts import gTTS

# Define paths
excel_file = "dictionary_az.xlsx"
output_dir = "audio_files"

# Create output directory if it doesn't exist
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Read the Excel file
# Assuming each tab (A-Z) contains a single column of words
xl = pd.ExcelFile(excel_file)

# Loop through each sheet (A-Z)
for sheet_name in xl.sheet_names:
    # Create a subdirectory for each letter
    letter_dir = os.path.join(output_dir, sheet_name.lower())
    if not os.path.exists(letter_dir):
        os.makedirs(letter_dir)
    
    # Read the words from the current sheet
    df = pd.read_excel(excel_file, sheet_name=sheet_name, header=None)
    words = df[0].dropna().tolist()  # Get list of words, remove NaN
    
    # Generate audio for each word
    for word in words:
        try:
            # Create gTTS object with American English
            tts = gTTS(text=word, lang='en', tld='us')  # 'us' for American English
            # Save audio file
            audio_file = os.path.join(letter_dir, f"{word.lower()}.mp3")
            tts.save(audio_file)
            print(f"Generated audio for: {word}")
        except Exception as e:
            print(f"Error generating audio for {word}: {e}")

print("Audio generation complete!")
