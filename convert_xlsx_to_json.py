import pandas as pd
import json

# Load the Excel file
xlsx_file = 'dictionary_az.xlsx'
xl = pd.ExcelFile(xlsx_file)

# Initialize dictionary
dictionary = {}

# Process each sheet (A-Z)
for sheet_name in xl.sheet_names:
    df = pd.read_excel(xlsx_file, sheet_name=sheet_name, header=None)
    words = df[0].dropna().tolist()  # Get words, remove NaN
    dictionary[sheet_name] = words

# Save to JSON
with open('dictionary.json', 'w', encoding='utf-8') as f:
    json.dump(dictionary, f, ensure_ascii=False, indent=2)

print("Converted to dictionary.json")
