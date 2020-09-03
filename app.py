
import keyboard
import time

keyboard.press_and_release('windows + down')
time.sleep(0.2)
keyboard.press_and_release('shift + f5')
time.sleep(0.5)
keyboard.press_and_release('f5')
time.sleep(1)
keyboard.press('ctrl + shift + p')
keyboard.release('ctrl')
keyboard.release('shift')
keyboard.release('p')
keyboard.write('Reload Window')
keyboard.press_and_release('enter')
time.sleep(2)
keyboard.press('ctrl + shift + p')
keyboard.release('ctrl')
keyboard.release('shift')
keyboard.release('p')
keyboard.write('Hello World')
time.sleep(0.8)
keyboard.press_and_release('enter')
