import os
import csv
from gtts import gTTS

# Directories
data_dir = '../data'
audio_dir = '../audio'

# Ensure audio directory exists
if not os.path.exists(audio_dir):
    os.makedirs(audio_dir)

# Process each letter (A-Z)
for letter in 'abcdefghijklmnopqrstuvwxyz':
    csv_file = os.path.join(data_dir, f'{letter}.csv')
    letter_audio_dir = os.path.join(audio_dir, letter)

    # Create letter-specific audio directory
    if not os.path.exists(letter_audio_dir):
        os.makedirs(letter_audio_dir)

    # Read CSV file
    if os.path.exists(csv_file):
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            next(reader)  # Skip header
            for row in reader:
                word = row[0].strip()
                if word:
                    # Generate audio
                    tts = gTTS(text=word, lang='en', tld='us')  # American English
                    audio_file = os.path.join(letter_audio_dir, f'{word}.mp3')
                    tts.save(audio_file)
                    print(f'Generated audio for {word} in {letter_audio_dir}')
    else:
        print(f'No CSV file found for letter {letter}')
