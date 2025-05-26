-- ENUMS
CREATE TYPE user_role AS ENUM ('admin', 'school_admin', 'guard', 'teacher', 'student', 'parent', 'driver');
CREATE TYPE attendance_type AS ENUM ('student', 'staff');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'excused');
CREATE TYPE homework_status AS ENUM ('completed', 'pending', 'late');
CREATE TYPE gender_type AS ENUM ('male', 'female');

-- USERS & AUTH
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE jwt_blacklist (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

-- SCHOOLS
CREATE TABLE schools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE school_admin_assignments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE
);

-- PERSONNEL
CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    contact_info TEXT,
    hire_date DATE,
    subject_specialties TEXT[]
);

CREATE TABLE guards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    contact_info TEXT,
    hire_date DATE
);

CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    first_name_ar VARCHAR(255) NOT NULL,
    last_name_ar VARCHAR(255) NOT NULL,
    address TEXT,
    address_ar TEXT,
    cin VARCHAR(255),
    phoneNumber VARCHAR(255),
    license_number VARCHAR(100)
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    first_name_ar VARCHAR(255) NOT NULL,
    last_name_ar VARCHAR(255) NOT NULL,
    address TEXT,
    address_ar TEXT,
    pupilCode VARCHAR(255),
    palaceOfBirth VARCHAR(255),
    palaceOfBirth_ar VARCHAR(255),
    cin VARCHAR(255),
    phoneNumber VARCHAR(255),
    gender gender_type NOT NULL,
    date_of_birth DATE,
    nationality VARCHAR(255),
    enrollment_date DATE,
    class_id INTEGER REFERENCES classes(id)
);

CREATE TABLE parents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    first_name_ar VARCHAR(255) NOT NULL,
    last_name_ar VARCHAR(255) NOT NULL,
    address TEXT,
    address_ar TEXT,
    cin VARCHAR(255),
    phoneNumber VARCHAR(255),
    contact_info TEXT
);

CREATE TABLE parent_student (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES parents(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE
);

-- ACADEMIC MANAGEMENT
CREATE TABLE academic_cycles (
    id SERIAL PRIMARY KEY,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE
);

CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    cycle_id INTEGER REFERENCES academic_cycles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    grade_level VARCHAR(50),
    teacher_id INTEGER REFERENCES teachers(id)
);

CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE class_subject (
    id SERIAL PRIMARY KEY,
    class_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id INTEGER REFERENCES teachers(id)
);

-- SCHEDULES
CREATE TABLE student_schedules (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    class_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    day_of_week VARCHAR(20),
    start_time TIME,
    end_time TIME
);

CREATE TABLE teacher_schedules (
    id SERIAL PRIMARY KEY,
    teacher_id INTEGER REFERENCES teachers(id) ON DELETE CASCADE,
    class_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    day_of_week VARCHAR(20),
    start_time TIME,
    end_time TIME
);

-- ATTENDANCE
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    type attendance_type NOT NULL,
    student_id INTEGER REFERENCES students(id),
    staff_id INTEGER REFERENCES users(id),
    status attendance_status NOT NULL,
    recorded_by INTEGER REFERENCES users(id),
    class_id INTEGER REFERENCES classes(id)
);

-- TRANSPORTATION
CREATE TABLE transportation (
    id SERIAL PRIMARY KEY,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    route_name VARCHAR(255),
    vehicle_number VARCHAR(100),
    driver_id INTEGER REFERENCES drivers(id)
);

CREATE TABLE accompaniments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    first_name_ar VARCHAR(255) NOT NULL,
    last_name_ar VARCHAR(255) NOT NULL,
    address TEXT,
    address_ar TEXT,
    cin VARCHAR(255),
    phoneNumber VARCHAR(255),
    transportation_id INTEGER REFERENCES transportation(id) ON DELETE CASCADE
);

-- ACADEMIC TRACKING
CREATE TABLE exams (
    id SERIAL PRIMARY KEY,
    class_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    date DATE,
    description TEXT
);

CREATE TABLE exam_grades (
    id SERIAL PRIMARY KEY,
    exam_id INTEGER REFERENCES exams(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    grade VARCHAR(10),
    notes TEXT
);

CREATE TABLE homework (
    id SERIAL PRIMARY KEY,
    class_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id INTEGER REFERENCES teachers(id) ON DELETE CASCADE,
    title VARCHAR(255),
    description TEXT,
    due_date DATE,
    assigned_date DATE
);

CREATE TABLE homework_completion (
    id SERIAL PRIMARY KEY,
    homework_id INTEGER REFERENCES homework(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    status homework_status NOT NULL,
    submitted_at TIMESTAMP
);

-- ACTIVITIES
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(255),
    description TEXT,
    date DATE
);

CREATE TABLE activity_registration (
    id SERIAL PRIMARY KEY,
    activity_id INTEGER REFERENCES activities(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    registered_at TIMESTAMP DEFAULT NOW()
);

-- LESSON PROGRESS
CREATE TABLE lesson_progress (
    id SERIAL PRIMARY KEY,
    class_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id INTEGER REFERENCES teachers(id) ON DELETE CASCADE,
    date DATE,
    topic VARCHAR(255),
    notes TEXT
);