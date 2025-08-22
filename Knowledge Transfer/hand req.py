import cv2
import mediapipe as mp

mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils

hands = mp_hands.Hands(min_detection_confidence=0.8, min_tracking_confidence=0.8)

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)

    finger_count = 0

    if results.multi_hand_landmarks and results.multi_handedness:
        for hand_landmarks, hand_label in zip(results.multi_hand_landmarks, results.multi_handedness):
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            label = hand_label.classification[0].label  # "Left" or "Right"

            # Finger tip and MCP indexes
            fingers = {
                "Index": (8, 5),
                "Middle": (12, 9),
                "Ring": (16, 13),
                "Pinky": (20, 17)
            }

            # Count fingers (Index - Pinky)
            for name, (tip, mcp) in fingers.items():
                if hand_landmarks.landmark[tip].y < hand_landmarks.landmark[mcp].y:
                    finger_count += 1

            # Thumb logic
            thumb_tip = hand_landmarks.landmark[4]
            thumb_ip = hand_landmarks.landmark[3]
            thumb_mcp = hand_landmarks.landmark[2]

            if label == "Right":
                if thumb_tip.x > thumb_ip.x and thumb_tip.x > thumb_mcp.x:
                    finger_count += 1
            else:  # Left hand
                if thumb_tip.x < thumb_ip.x and thumb_tip.x < thumb_mcp.x:
                    finger_count += 1

    # Show count
    cv2.putText(frame, f"Fingers: {finger_count}", (50, 100),
                cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 0), 3)

    cv2.imshow("Hand Gesture", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
