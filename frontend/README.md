# Task Manager Frontend

This is the frontend of the Task Manager application, built using [Next.js].

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/task-manager-nextjs.git
   cd task-manager-nextjs/frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Ensure the backend server is running and accessible. Update the `apiUrls.js` file in the `services` folder if the backend URL differs from `http://localhost:5000`.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

5. **Backend Setup**:
   Start the Express Server using `node server.js`.

## Approach Explanation

### Frontend Architecture

- **Framework**: Built with Next.js for server-side rendering and optimized performance.
- **Styling**: Tailwind CSS is used for styling, ensuring a responsive and modern UI.
- **State Management**: Context API is used for managing global states like authentication and tasks.
- **API Communication**: Axios is used for making API requests to the backend.
- **Component Structure**: Components are modularized for reusability and maintainability.

### Responsive Design

The application is designed to be fully responsive, ensuring usability across devices of all sizes:
- **Mobile**: Compact layouts with collapsible menus and optimized touch interactions.
- **Tablet**: Adaptive grid layouts for better content visibility.
- **Desktop**: Full-width layouts with sidebars and detailed views.
- **CSS Utilities**: Tailwind CSS utilities like `flex`, `grid`, and `responsive breakpoints` are used to achieve responsiveness.

### CRUD Operations

#### Tasks
1. **Create**: Admins and managers can create tasks with details like title, description, due date, priority, and assigned user.
2. **Read**: All users can view tasks. Admins and managers can view all tasks, while regular users can view only tasks assigned to them.
3. **Update**: Admins and managers can update task details, including reassigning tasks.
4. **Delete**: Admins and managers can delete tasks.

#### Users
1. **Create**: Users can register themselves via the registration form.
2. **Read**: Admins and managers can view all users. Managers cannot view admin accounts.
3. **Update**: Admins can update user roles (e.g., promote a user to manager).
4. **Delete**: Admins can delete user accounts.

### Features

1. **Authentication**:
   - Login and registration with role-based access control (Admin, Manager, User).
   - JWT tokens are stored in `localStorage` for session management.

2. **Task Management**:
   - Create, update, delete, and assign tasks.
   - Mark tasks as complete and view task details in a modal.

3. **Dashboard**:
   - Displays all tasks and highlights tasks with upcoming deadlines.

4. **Schedule**:
   - Calendar view for tasks, showing tasks by date and time.

5. **Progress**:
   - Analytics for task completion rates and overdue tasks.
   - User-wise task completion statistics.

6. **Logs**:
   - Audit logs for tracking user actions (Admin only).

7. **Notifications**:
   - Real-time notifications for task assignments and updates.

8. **Framer Motion**:
   - Used for smooth animations and transitions across the application.
   - Enhances user experience with animated modals, page transitions, and interactive elements.
   - Examples include:
     - Animating modals like `TaskModal` and `CreateTaskModal`.
     - Page transitions in `Login` and `Register` components.
     - Smooth fade-in and fade-out effects for alerts and notifications.

## Libraries Used

The following libraries and tools are used in this project:

### Frontend Libraries
1. **Next.js**: Framework for server-side rendering and static site generation.
2. **React**: JavaScript library for building user interfaces.
3. **Tailwind CSS**: Utility-first CSS framework for styling.
4. **Axios**: Promise-based HTTP client for making API requests.
5. **Framer Motion**: Library for animations and transitions.
6. **React Icons**: Collection of popular icons for React.
7. **React Circular Progressbar**: Component for displaying progress in a circular format.

### Backend Communication
- The frontend communicates with the backend using RESTful APIs. Ensure the backend is running and accessible at the specified URL.

### Assumptions and Trade-offs

- **Authentication**:
  - JWT tokens are stored in `localStorage`, which is vulnerable to XSS attacks but simplifies implementation.

- **Role-Based Access**:
  - Admins have full access, while managers and users have restricted access based on their roles.

- **Performance**:
  - Optimized for small to medium-sized teams. Scaling to larger teams may require additional optimizations.

- **Error Handling**:
  - Basic error handling is implemented. Advanced error reporting tools like Sentry can be integrated for production use.

- **Role Selection During Registration**:
  - Anyone can register as any role (Admin, Manager, or User) for testing purposes. This should be restricted in production environments.

### Learn More

To learn more about Next.js, visit the [Next.js Documentation](https://nextjs.org/docs).
