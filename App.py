import sys
from PyQt5 import QtWidgets,QtGui,QtCore
from PyQt5.QtWebEngineWidgets import *
app=QtWidgets.QApplication(sys.argv)
w=QWebEngineView()
w.load(QtCore.QUrl('http://192.168.0.50:3000')) ## load google on startup
w.setFixedWidth(800)
w.setFixedHeight(950)
w.show()
app.exec_()