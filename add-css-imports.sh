#!/bin/bash

# Script to add CSS imports to all component files that don't already have them
# Usage: ./add-css-imports.sh

echo "Adding CSS imports to component files..."

# List of files that already have CSS imports (we'll skip these)
ALREADY_DONE=("button.tsx" "skeleton.tsx" "command.tsx" "switch.tsx" "input.tsx" "label.tsx")

# Change to the components directory
cd src/components/ui

# Process each .tsx file
for file in *.tsx; do
    # Check if file is in the already done list
    skip=false
    for done_file in "${ALREADY_DONE[@]}"; do
        if [[ "$file" == "$done_file" ]]; then
            skip=true
            break
        fi
    done
    
    if [[ "$skip" == true ]]; then
        echo "Skipping $file (already has CSS import)"
        continue
    fi
    
    # Check if file already has CSS import
    if grep -q 'import.*index\.css' "$file"; then
        echo "Skipping $file (already has CSS import)"
        continue
    fi
    
    echo "Processing $file..."
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Check if file starts with "use client"
    if head -1 "$file" | grep -q '"use client"'; then
        # File starts with "use client" - add CSS import after it
        head -1 "$file" > "$temp_file"
        echo 'import "../../index.css"' >> "$temp_file"
        tail -n +2 "$file" >> "$temp_file"
    else
        # File doesn't start with "use client" - add CSS import at the beginning
        echo 'import "../../index.css"' > "$temp_file"
        cat "$file" >> "$temp_file"
    fi
    
    # Replace original file with modified version
    mv "$temp_file" "$file"
    echo "✅ Added CSS import to $file"
done

echo ""
echo "🎉 Done! CSS imports have been added to all component files."
echo ""
echo "Files processed:"
echo "- All .tsx files in src/components/ui/ now include the CSS import"
echo "- Files that already had imports were skipped"
echo ""
echo "You can now run 'pnpm build' to rebuild with all components including CSS." 