
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import './App.css';
// import FacultyListPage from './pages/FacultyListPage';
// import AddFacultyPage from './pages/AddFacultyPage';
// import EditFacultyPage from './pages/EditFacultyPage';
// import SubjectListPage from './pages/SubjectListPage';
// import AddSubjectPage from './pages/AddSubjectPage';
// import EditSubjectPage from './pages/EditSubjectPage';
// import RoomListPage from './pages/RoomListPage';
// import AddRoomPage from './pages/AddRoomPage';
// import EditRoomPage from './pages/EditRoomPage';
// import BatchListPage from './pages/BatchListPage';
// import AddBatchPage from './pages/AddBatchPage';
// import EditBatchPage from './pages/EditBatchPage';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <div className="header-content">
//             <div className="logo-section">
//               <h1 className="app-title">
//                 <span className="title-icon">📅</span>
//                 Timetable Scheduler
//               </h1>
//               <p className="app-subtitle">Manage your academic schedule efficiently</p>
//             </div>

//             <nav className="nav-menu">
//               <div className="nav-group">
//                 <span className="nav-group-title">Faculty Management</span>
//                 <Link to="/faculties" className="nav-link">
//                   <span className="nav-icon">👥</span>
//                   View Faculties
//                 </Link>
//                 <Link to="/faculties/add" className="nav-link nav-link-primary">
//                   <span className="nav-icon">➕</span>
//                   Add Faculty
//                 </Link>
//               </div>

//               <div className="nav-divider"></div>

//               <div className="nav-group">
//                 <span className="nav-group-title">Subject Management</span>
//                 <Link to="/subjects" className="nav-link">
//                   <span className="nav-icon">📚</span>
//                   View Subjects
//                 </Link>
//                 <Link to="/subjects/add" className="nav-link nav-link-secondary">
//                   <span className="nav-icon">📝</span>
//                   Add Subject
//                 </Link>
//               </div>

//               <div className="nav-divider"></div>

//               <div className="nav-group">
//                 <span className="nav-group-title">Room Management</span>
//                 <Link to="/rooms" className="nav-link">
//                   <span className="nav-icon">🏫</span>
//                   View Rooms
//                 </Link>
//                 <Link to="/rooms/add" className="nav-link nav-link-tertiary">
//                   <span className="nav-icon">🏗️</span>
//                   Add Room
//                 </Link>
//               </div>
//             </nav>
//           </div>
//         </header>

//         <main className="main-content">
//           <div className="content-wrapper">
//             <Routes>
//               {/* Faculty Routes */}
//               <Route path="/faculties" element={<FacultyListPage />} />
//               <Route path="/faculties/add" element={<AddFacultyPage />} />
//               <Route path="/faculties/edit/:id" element={<EditFacultyPage />} />

//               {/* Subject Routes */}
//               <Route path="/subjects" element={<SubjectListPage />} />
//               <Route path="/subjects/add" element={<AddSubjectPage />} />
//               <Route path="/subjects/edit/:id" element={<EditSubjectPage />} />

//               {/* Room Routes */}
//               <Route path="/rooms" element={<RoomListPage />} />
//               <Route path="/rooms/add" element={<AddRoomPage />} />
//               <Route path="/rooms/edit/:id" element={<EditRoomPage />} />

//               {/* Batch Routes */}
//               <Route path="/batches" element={<BatchListPage />} />
//               <Route path="/batches/add" element={<AddBatchPage />} />
//               <Route path="/batches/edit/:id" element={<EditBatchPage />}></Route>

//               {/* Default Route */}
//               <Route path="/" element={
//                 <div className="welcome-section">
//                   <div className="welcome-content">
//                     <div className="welcome-icon">🎓</div>
//                     <h2 className="welcome-title">Welcome to Timetable Scheduler</h2>
//                     <p className="welcome-description">
//                       Efficiently manage your academic resources with our comprehensive scheduling system.
//                       Create, organize, and maintain faculty, subjects, and room assignments all in one place.
//                     </p>
//                     <div className="quick-actions">
//                       <Link to="/faculties" className="quick-action-card">
//                         <div className="card-icon">👥</div>
//                         <h3>Manage Faculties</h3>
//                         <p>Add, edit, and organize faculty members with their specializations and schedules</p>
//                       </Link>
//                       <Link to="/subjects" className="quick-action-card">
//                         <div className="card-icon">📚</div>
//                         <h3>Manage Subjects</h3>
//                         <p>Configure subjects, course details, and academic requirements</p>
//                       </Link>
//                       <Link to="/rooms" className="quick-action-card">
//                         <div className="card-icon">🏫</div>
//                         <h3>Manage Rooms</h3>
//                         <p>Organize classroom spaces, capacities, and facility details</p>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               } />
//             </Routes>
//           </div>
//         </main>

//         <footer className="app-footer">
//           <div className="footer-content">
//             <div className="footer-section">
//               <h4>Quick Links</h4>
//               <div className="footer-links">
//                 <Link to="/faculties" className="footer-link">Faculty Management</Link>
//                 <Link to="/subjects" className="footer-link">Subject Management</Link>
//                 <Link to="/rooms" className="footer-link">Room Management</Link>
//               </div>
//             </div>
//             <div className="footer-section">
//               <h4>About</h4>
//               <p className="copyright">&copy; 2025 Timetable Scheduler. All rights reserved.</p>
//               <p className="powered-by">Built with React & modern web technologies</p>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import FacultyListPage from './pages/FacultyListPage';
import AddFacultyPage from './pages/AddFacultyPage';
import EditFacultyPage from './pages/EditFacultyPage';
import SubjectListPage from './pages/SubjectListPage';
import AddSubjectPage from './pages/AddSubjectPage';
import EditSubjectPage from './pages/EditSubjectPage';
import RoomListPage from './pages/RoomListPage';
import AddRoomPage from './pages/AddRoomPage';
import EditRoomPage from './pages/EditRoomPage';
import BatchListPage from './pages/BatchListPage';
import AddBatchPage from './pages/AddBatchPage';
import EditBatchPage from './pages/EditBatchPage';
import GeneratorPage from './pages/GeneratorPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <div className="logo-section">
              <h1 className="app-title">
                <span className="nav-icon">📅</span>
                Timetable Scheduler
              </h1>
              <p className="app-subtitle">Manage your academic schedule efficiently</p>
            </div>

            <nav className="nav-menu">
              <div className="nav-group">
                <span className="nav-group-title">Faculty Management</span>
                <Link to="/faculties" className="nav-link">
                  <span className="nav-icon">👥</span>
                  View Faculties
                </Link>
                <Link to="/faculties/add" className="nav-link nav-link-primary">
                  <span className="nav-icon">➕</span>
                  Add Faculty
                </Link>
              </div>

              <div className="nav-divider"></div>

              <div className="nav-group">
                <span className="nav-group-title">Subject Management</span>
                <Link to="/subjects" className="nav-link">
                  <span className="nav-icon">📚</span>
                  View Subjects
                </Link>
                <Link to="/subjects/add" className="nav-link nav-link-secondary">
                  <span className="nav-icon">📝</span>
                  Add Subject
                </Link>
              </div>

              <div className="nav-divider"></div>

              <div className="nav-group">
                <span className="nav-group-title">Room Management</span>
                <Link to="/rooms" className="nav-link">
                  <span className="nav-icon">🏫</span>
                  View Rooms
                </Link>
                <Link to="/rooms/add" className="nav-link nav-link-tertiary">
                  <span className="nav-icon">🏗️</span>
                  Add Room
                </Link>
              </div>

              <div className="nav-divider"></div>

              <div className="nav-group">
                <span className="nav-group-title">Batch Management</span>
                <Link to="/batches" className="nav-link">
                  <span className="nav-icon">👨‍🎓</span>
                  View Batches
                </Link>
                <Link to="/batches/add" className="nav-link nav-link-accent">
                  <span className="nav-icon">➕</span>
                  Add Batch
                </Link>
              </div>

              <div className="nav-divider"></div>

              <div className="nav-group">
                <span className="nav-group-title">Generate Timetable</span>
                <Link to="/generator" className="nav-link">
                  <span className="nav-icon">👨‍🎓</span>
                  Generate Timetable
                </Link>
              </div>

            </nav>
          </div>
        </header>

        <main className="main-content">
          <div className="content-wrapper">
            <Routes>
              {/* Faculty Routes */}
              <Route path="/faculties" element={<FacultyListPage />} />
              <Route path="/faculties/add" element={<AddFacultyPage />} />
              <Route path="/faculties/edit/:id" element={<EditFacultyPage />} />

              {/* Subject Routes */}
              <Route path="/subjects" element={<SubjectListPage />} />
              <Route path="/subjects/add" element={<AddSubjectPage />} />
              <Route path="/subjects/edit/:id" element={<EditSubjectPage />} />

              {/* Room Routes */}
              <Route path="/rooms" element={<RoomListPage />} />
              <Route path="/rooms/add" element={<AddRoomPage />} />
              <Route path="/rooms/edit/:id" element={<EditRoomPage />} />

              {/* Batch Routes */}
              <Route path="/batches" element={<BatchListPage />} />
              <Route path="/batches/add" element={<AddBatchPage />} />
              <Route path="/batches/edit/:id" element={<EditBatchPage />} />

              <Route path="/batches" element={<BatchListPage />} />
              <Route path="/generator" element={<GeneratorPage />} /> 
              {/* Default Route */}
              <Route path="/" element={
                <div className="welcome-section">
                  <div className="welcome-content">
                    <div className="welcome-icon">🎓</div>
                    <h2 className="welcome-title">Welcome to Timetable Scheduler</h2>
                    <p className="welcome-description">
                      Efficiently manage your academic resources with our comprehensive scheduling system.
                      Create, organize, and maintain faculty, subjects, rooms, and batch assignments all in one place.
                    </p>
                    <div className="quick-actions">
                      <Link to="/faculties" className="quick-action-card">
                        <div className="card-icon">👥</div>
                        <h3>Manage Faculties</h3>
                        <p>Add, edit, and organize faculty members with their specializations and schedules</p>
                      </Link>
                      <Link to="/subjects" className="quick-action-card">
                        <div className="card-icon">📚</div>
                        <h3>Manage Subjects</h3>
                        <p>Configure subjects, course details, and academic requirements</p>
                      </Link>
                      <Link to="/rooms" className="quick-action-card">
                        <div className="card-icon">🏫</div>
                        <h3>Manage Rooms</h3>
                        <p>Organize classroom spaces, capacities, and facility details</p>
                      </Link>
                      <Link to="/batches" className="quick-action-card">
                        <div className="card-icon">👨‍🎓</div>
                        <h3>Manage Batches</h3>
                        <p>Create and organize student batches and class groups</p>
                      </Link>
                    </div>
                  </div>
                </div>
              } />
            </Routes>
          </div>
        </main>

        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <div className="footer-links">
                <Link to="/faculties" className="footer-link">Faculty Management</Link>
                <Link to="/subjects" className="footer-link">Subject Management</Link>
                <Link to="/rooms" className="footer-link">Room Management</Link>
                <Link to="/batches" className="footer-link">Batch Management</Link>
              </div>
            </div>
            <div className="footer-section">
              <h4>About</h4>
              <p className="copyright">&copy; 2025 Timetable Scheduler. All rights reserved.</p>
              <p className="powered-by">Built with React & modern web technologies</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;