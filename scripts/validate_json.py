#!/usr/bin/env python3
# Valida todos los JSON del proyecto. Ejecutar antes de hacer cambios masivos en i18n.
# Uso: python3 scripts/validate_json.py

import json, os, glob, sys

patterns = [
    'src/i18n/benefits_*.json',
    'src/data/smoothies_*.json',
]

errors = []
for pattern in patterns:
    for fp in sorted(glob.glob(pattern)):
        try:
            d = json.load(open(fp))
            print(f'✅ {fp} ({len(d)} items)')
        except json.JSONDecodeError as e:
            print(f'❌ {fp} — {e}')
            errors.append(fp)

if errors:
    print(f'\n{len(errors)} archivo(s) con errores.')
    sys.exit(1)
else:
    print('\nTodos los JSON válidos.')
