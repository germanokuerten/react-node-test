const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json(students);
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const newStudent = await addNewStudent(req.body);
    res.status(201).json(newStudent);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const updatedStudent = await updateStudent(req.params.id, req.body);
    if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStudent);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const student = await getStudentDetail(req.params.id);
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const updatedStatus = await setStudentStatus(req.params.id, req.body.status);
    if (!updatedStatus) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStatus);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
