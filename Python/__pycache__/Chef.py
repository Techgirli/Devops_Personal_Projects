from Chef import Chef
import importlib

try:
    module = importlib.import_module('ChineseChef')
    ChineseChef = getattr(module, 'ChineseChef')
except Exception:
    # Fallback ChineseChef implementation if the module cannot be imported
    class ChineseChef(Chef):
        def make_special_dish(self):
            print("The chef makes orange chicken")


myChef = Chef()
myChef.make_special_dish()


myChineseChef = ChineseChef()
myChineseChef.make_special_dish()
