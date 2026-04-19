import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-773c0d79/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== STUDENT ENDPOINTS ====================

// Get all students (for leaderboard)
app.get("/make-server-773c0d79/students", async (c) => {
  try {
    const students = await kv.getByPrefix("student:");
    console.log(`Retrieved ${students.length} students from database`);
    return c.json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching students:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get specific student by ID
app.get("/make-server-773c0d79/students/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const student = await kv.get(`student:${id}`);
    
    if (!student) {
      return c.json({ success: false, error: "Student not found" }, 404);
    }
    
    return c.json({ success: true, data: student });
  } catch (error) {
    console.error(`Error fetching student ${c.req.param("id")}:`, error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create or update student
app.post("/make-server-773c0d79/students", async (c) => {
  try {
    const student = await c.req.json();
    
    if (!student.id || !student.name) {
      return c.json({ success: false, error: "Student ID and name are required" }, 400);
    }
    
    await kv.set(`student:${student.id}`, student);
    console.log(`Student ${student.name} (${student.id}) saved successfully`);
    
    return c.json({ success: true, data: student });
  } catch (error) {
    console.error("Error saving student:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update student
app.put("/make-server-773c0d79/students/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const updates = await c.req.json();
    
    const existingStudent = await kv.get(`student:${id}`);
    if (!existingStudent) {
      return c.json({ success: false, error: "Student not found" }, 404);
    }
    
    const updatedStudent = { ...existingStudent, ...updates };
    await kv.set(`student:${id}`, updatedStudent);
    console.log(`Student ${id} updated successfully`);
    
    return c.json({ success: true, data: updatedStudent });
  } catch (error) {
    console.error(`Error updating student ${c.req.param("id")}:`, error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== QUESTIONS ENDPOINTS ====================

// Get question bank
app.get("/make-server-773c0d79/questions", async (c) => {
  try {
    const questions = await kv.get("questions");
    
    if (!questions) {
      return c.json({ success: true, data: [] });
    }
    
    console.log(`Retrieved ${questions.length} questions from database`);
    return c.json({ success: true, data: questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update question bank (teacher only)
app.post("/make-server-773c0d79/questions", async (c) => {
  try {
    const questions = await c.req.json();
    
    if (!Array.isArray(questions)) {
      return c.json({ success: false, error: "Questions must be an array" }, 400);
    }
    
    await kv.set("questions", questions);
    console.log(`Question bank updated with ${questions.length} questions`);
    
    return c.json({ success: true, data: questions });
  } catch (error) {
    console.error("Error updating questions:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== ESSAY ENDPOINTS ====================

// Save essay submission
app.post("/make-server-773c0d79/essays", async (c) => {
  try {
    const essay = await c.req.json();
    
    if (!essay.id || !essay.studentId) {
      return c.json({ success: false, error: "Essay ID and student ID are required" }, 400);
    }
    
    await kv.set(`essay:${essay.id}`, essay);
    console.log(`Essay submission ${essay.id} saved from student ${essay.studentName}`);
    
    return c.json({ success: true, data: essay });
  } catch (error) {
    console.error("Error saving essay:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all pending essays (for teacher review)
app.get("/make-server-773c0d79/essays/pending", async (c) => {
  try {
    const allEssays = await kv.getByPrefix("essay:");
    const pendingEssays = allEssays.filter((essay: any) => essay.status === 'pending');
    
    console.log(`Retrieved ${pendingEssays.length} pending essays for review`);
    return c.json({ success: true, data: pendingEssays });
  } catch (error) {
    console.error("Error fetching pending essays:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get essays by student ID
app.get("/make-server-773c0d79/essays/student/:studentId", async (c) => {
  try {
    const studentId = c.req.param("studentId");
    const allEssays = await kv.getByPrefix("essay:");
    const studentEssays = allEssays.filter((essay: any) => essay.studentId === studentId);
    
    console.log(`Retrieved ${studentEssays.length} essays for student ${studentId}`);
    return c.json({ success: true, data: studentEssays });
  } catch (error) {
    console.error(`Error fetching essays for student ${c.req.param("studentId")}:`, error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Score essay (teacher)
app.put("/make-server-773c0d79/essays/:id/score", async (c) => {
  try {
    const id = c.req.param("id");
    const scoreData = await c.req.json();
    
    const existingEssay = await kv.get(`essay:${id}`);
    if (!existingEssay) {
      return c.json({ success: false, error: "Essay not found" }, 404);
    }
    
    const updatedEssay = { 
      ...existingEssay, 
      ...scoreData,
      reviewedAt: new Date().toISOString()
    };
    
    await kv.set(`essay:${id}`, updatedEssay);
    console.log(`Essay ${id} scored: ${scoreData.score}/100`);
    
    return c.json({ success: true, data: updatedEssay });
  } catch (error) {
    console.error(`Error scoring essay ${c.req.param("id")}:`, error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);