#!/bin/bash

# Script pour découper la vidéo en 10 segments de durée uniforme
# Durée totale: 304.41 secondes
# Durée par segment: 30.44 secondes

VIDEO_PATH="/Users/ngansopmiguel/Documents/dev/internet/a-light-for-mama/public/video.mp4"
OUTPUT_DIR="/Users/ngansopmiguel/Documents/dev/internet/a-light-for-mama/public/video_segments"

# Créer le dossier de sortie
mkdir -p "$OUTPUT_DIR"

# Durée totale en secondes
TOTAL_DURATION=304.41

# Nombre de segments
SEGMENTS=10

# Durée par segment
SEGMENT_DURATION=$(echo "scale=2; $TOTAL_DURATION / $SEGMENTS" | bc)

echo "Découpage de la vidéo en $SEGMENTS segments de ${SEGMENT_DURATION}s chacun..."

# Découper la vidéo en segments
for i in $(seq 0 $((SEGMENTS-1))); do
    START_TIME=$(echo "scale=2; $i * $SEGMENT_DURATION" | bc)
    OUTPUT_FILE="$OUTPUT_DIR/video_segment_$((i+1)).mp4"
    
    echo "Création du segment $((i+1))/10 (début: ${START_TIME}s)..."
    
    ffmpeg -i "$VIDEO_PATH" \
           -ss "$START_TIME" \
           -t "$SEGMENT_DURATION" \
           -c copy \
           -avoid_negative_ts make_zero \
           "$OUTPUT_FILE" \
           -y
    
    if [ $? -eq 0 ]; then
        echo "✅ Segment $((i+1)) créé: $OUTPUT_FILE"
    else
        echo "❌ Erreur lors de la création du segment $((i+1))"
    fi
done

echo ""
echo "🎬 Découpage terminé !"
echo "📁 Fichiers créés dans: $OUTPUT_DIR"
echo "📊 Durée par segment: ${SEGMENT_DURATION}s"
