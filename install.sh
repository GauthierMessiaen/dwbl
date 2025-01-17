#!/bin/bash

# @author Tom Neutens (tomneutens@gmail.com)
# IMPORTANT! Run the install script from the directory where you put it! It uses the location from where it is run to configure the paths to the executables!

# @date 02/12/2019 (2nd december 2019)

# utility functions for shared commands between platforms

# check if running as root
check_for_root () {
    if [ $(/usr/bin/id -u) -ne 0 ]
    then
        echo "Not running as root, you will have to grant permissions to install dependencies."
        root=1
    else
        echo "Running as root..."
        root=0
    fi
}

# Check if python3 is installed
check_python_install () {
    if command -v python3 &>/dev/null
    then
        echo Python 3 already installed.
    else
        echo Python 3 is not installed, trying to install.
        sudo apt-get update
        sudo apt-get install python3.6
    fi
    echo "Checking if pyserial is installed."
    python3 -c "import serial"
    res=$?
    if [ $res -eq 0 ]
    then
        echo "Pyserial module already installed!"
    else
        echo "Pyserial not installed, trying to install using pip3."
        echo "Checking if pip3 is installed."
        if which pip3 > /dev/null
        then
            echo "pip3 is installed, skipping..."
        else
            echo "Trying to install pip."
            sudo apt-get install python3-pip
        fi
        echo "Installing pyserial using pip."
        python3 -m pip install pyserial
        echo "Done installing pyserial."
    fi
}

# Check if nodejs is installed
check_nodejs_install () {
    if which node > /dev/null
    then
        echo "nodejs is installed, skipping..."
    else
        # add deb.nodesource repo commands 
        # install node
        echo "Installing nodejs using root permissions.."
        sudo curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
        sudo apt install nodejs
    fi
}

# Check if chrome is installed
check_chrome_install () {
    echo "Checking if Google chrome is installed."
    if hash google-chrome 2>/dev/null
    then
        echo "Google chrome is installed, skipping..."
    else
        echo "Installing google chrome."
        wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
        sudo dpkg -i google-chrome-stable_current_amd64.deb
        rm google-chrome-stable_current_amd64.deb
        echo "Finished installing google chrome."
    fi

}


#check os type
if [ $OSTYPE == "linux-gnu" ]
then
    echo "Installing for gnu-linux system."
    
    # Check if script is run as root
    check_for_root
    
    # Check if python3 is installed
    check_python_install

    # Check nodejs install
    check_nodejs_install
    
    # Check if Google chrome is installed
    check_chrome_install

    # Create desktop file if not existant
    touch ./dwenguinoblockly.desktop
    # Empty the file
    > ./dwenguinoblockly.desktop
    # Write contents
    echo '[Desktop Entry]' >> ./dwenguinoblockly.desktop
    echo 'Type=Application' >> ./dwenguinoblockly.desktop
    echo 'Terminal=false' >> ./dwenguinoblockly.desktop
    echo 'Name=dwenguinoblockly' >> ./dwenguinoblockly.desktop
    echo "Icon=$(pwd)/dwengo_robot_plain.svg" >> ./dwenguinoblockly.desktop
    echo "Exec=$(pwd)/start.sh" >> ./dwenguinoblockly.desktop
    
    chmod u+x ./dwenguinoblockly.desktop
    cp ./dwenguinoblockly.desktop ~/Desktop/dwenguinoblockly.desktop
    gio set ~/Desktop/dwenguinoblockly.desktop "metadata::trusted" yes
    rm ./dwenguinoblockly.desktop
    echo "Created desktop icon!"

    # Configure start file
    echo "#!/bin/bash" > start.sh
    echo "cd $(pwd)/backend" >> start.sh 
    echo "node index" >> start.sh
    chmod +x start.sh
    
    # Configure make binaries
    rm ./backend/compilation/bin/make
    cp ./backend/compilation/bin/linux/make ./backend/compilation/bin/make
    echo "Configured make binaries for linux!"

    echo "Adding user to dialout group to get access to the USB ports"
    sudo usermod -a -G dialout $USER
    sudo usermod -a -G tty $USER
    sudo chmod 666 /dev/ttyACM0
    
    echo "---------------------------------------------------------------------------------------"
    echo "Configured start script!"
    echo "Installation completed, you can launch DwenguinoBlockly using the desktop icon!"
    echo "IMPORTANT! If you can not upload your program to the board because of a permission denied error\
 you should REBOOT your computer and try again.\ 
Some of the changes made by the script require a reboot before they take effect"
    echo "---------------------------------------------------------------------------------------"
    
elif [ $OSTYPE ==  "darwin" ]
then
    # MACOS config
    echo "MACOS install is not supported right now"
    
    # Check if script is run as root
    check_for_root
    
    # Check if python3 is installed
    check_python_install

    # Check nodejs install
    check_nodejs_install
    
    # Configure make binaries
    brew install --with-default-names make
    cp /usr/local/bin/gmake ./backend/compilation/bin/make
    #rm ./backend/compilation/bin/make
    #cp ./backend/compilation/bin/macos/make ./backend/compilation/bin/make
    echo "Configured make binaries for macos"
    
    # Configure start file
    echo "#!/bin/bash" > dwenguinoblockly.command
    echo "cd $(pwd)/backend" >> dwenguinoblockly.command
    echo "node index" >> dwenguinoblockly.command
    chmod +x dwenguinoblockly.command
    cp dwenguinoblockly.command ~/Desktop
    
    
        
elif [ $OSTYPE == "win32" ]
then
    # Windows config
    echo "Windows install is not supported right now"
    
    # Configure make binaries
    rm ./backend/compilation/bin/make
    cp ./backend/compilation/bin/windows/make.exe ./backend/compilation/bin/make
    echo "Configured make binaries for windows"
fi
