# Application de Réservation d'Événements

Une application web permettant aux utilisateurs de réserver des places pour des événements, avec une interface d'administration pour gérer les événements.

## Prérequis
- Node.js (v14 ou supérieur)
- MariaDB installé et en cours d'exécution
- Git

## Installation et configuration

1. **Cloner le dépôt**
   ```
   git clone https://github.com/marwanG12/event_ooking.git
   cd event_ooking
   ```

2. **Configuration de la base de données**
   - Créez une base de données nommée `events_db` dans MariaDB
   - Configurez le fichier `.env` dans le dossier backend:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=votre_mot_de_passe
     DB_NAME=events_db
     DB_DIALECT=mariadb
     JWT_SECRET=votre_secret_jwt
     PORT=3001
     ```

3. **Installation et démarrage du backend**
   ```
   cd backend
   npm install
   npm run seed       # Initialise la base de données avec des données de test
   npm start          # Démarre le serveur sur le port 3001
   ```

4. **Installation et démarrage du frontend**
   ```
   cd ../frontend
   npm install
   npm start          # Démarre l'application React sur le port 3000
   ```

5. **Accéder à l'application**
   - Ouvrez votre navigateur et accédez à `http://localhost:3000`
   - Vous pouvez vous connecter avec les identifiants suivants:
     - Admin: admin@example.com / admin123
     - Client: client@example.com / client123

## Architecture

L'application est divisée en deux parties principales :

- **Backend** : API REST développée avec Node.js et Express, utilisant Sequelize comme ORM pour interagir avec la base de données MariaDB
- **Frontend** : Application React utilisant React Router pour la navigation et Axios pour les appels API

## Fonctionnalités

### Administrateurs
- Connexion à l'interface d'administration
- Création de nouveaux événements
- Suppression d'événements existants
- Vue d'ensemble des événements et de leur capacité

### Clients
- Inscription et connexion
- Consultation des événements disponibles
- Réservation de places pour les événements
- Consultation et annulation de leurs réservations

## Résolution des problèmes

En cas de problème d'authentification avec MariaDB, assurez-vous que votre utilisateur est configuré pour utiliser `mysql_native_password` comme méthode d'authentification.

Pour modifier la méthode d'authentification dans MariaDB, connectez-vous en tant qu'administrateur et exécutez :
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'votre_mot_de_passe';
FLUSH PRIVILEGES;
``` 