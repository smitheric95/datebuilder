$script = <<SCRIPT
#!/usr/bin/env bash

shareroot="/vagrant/datebuilder"
webroot="/var/www/public"
password="pass"

#switch to root
sudo su

apt-get update

# Install Apache2
apt-get install -y apache2

# Configure Apache2 to load from shared directory (if needed)
if ! [ -L $webroot ]; then
  rm -rf $webroot
  ln -fs $shareroot $webroot
fi

# Install MySQL + dependencies
debconf-set-selections <<< "mysql-server-5.5 mysql-server/root_password password $password"
debconf-set-selections <<< "mysql-server-5.5 mysql-server/root_password_again password $password"
apt-get -y install mysql-server libapache2-mod-auth-mysql php5-mysql

# Install PHP + dependencies
apt-get -y install php5 libapache2-mod-php5 php5-mcrypt php5-curl php5-sqlite

# Install phpMyAdmin
debconf-set-selections <<< "phpmyadmin phpmyadmin/dbconfig-install boolean true"
debconf-set-selections <<< "phpmyadmin phpmyadmin/app-password-confirm password $password"
debconf-set-selections <<< "phpmyadmin phpmyadmin/mysql/admin-pass password $password"
debconf-set-selections <<< "phpmyadmin phpmyadmin/mysql/app-pass password $password"
debconf-set-selections <<< "phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2"
apt-get install -y phpmyadmin

# Enable php extension
php5enmod mcrypt

# Install git (needed for composer)
apt-get install git

# Install Composer
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer

# Run composer
composer --working-dir=$webroot install

# Configure apache to rewrite
echo -e "<VirtualHost *:80>" > /etc/apache2/sites-available/000-default.conf
echo -e "\tDocumentRoot ${webroot}" >> /etc/apache2/sites-available/000-default.conf
echo -e "\t<Directory ${webroot}>" >> /etc/apache2/sites-available/000-default.conf
echo -e "\t\tAllowOverride All" >> /etc/apache2/sites-available/000-default.conf
echo -e "\t</Directory>" >> /etc/apache2/sites-available/000-default.conf
echo -e "\tErrorLog /error.log" >> /etc/apache2/sites-available/000-default.conf
echo -e "\tCustomLog /access.log combined" >> /etc/apache2/sites-available/000-default.conf
echo -e "</VirtualHost>" >> /etc/apache2/sites-available/000-default.conf

# Enable Apache mod_rewrite
a2enmod rewrite

# Restart Apache2
service apache2 restart
SCRIPT

Vagrant.configure("2") do |config|
  # Base VM
  config.vm.box = "ubuntu/trusty64"

  config.vm.provider :virtualbox do |p|
    p.customize ['modifyvm', :id, '--memory', '2048']
  end

  # Use the script above to provision the vm
  config.vm.provision "shell", inline: $script

  # Set up private networking
  config.vm.network "private_network", ip: "192.168.50.4"
  config.vm.network "forwarded_port", guest: 80, host: 5000

end
