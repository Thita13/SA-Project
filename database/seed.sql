-- -----------------------------
-- Roles / Users ตัวอย่าง
-- -----------------------------
-- สร้างผู้ใช้ admin
INSERT INTO users (name_user, password, role)
VALUES 
('Admin User', '123456', 'admin'),
('Staff User', '123456', 'staff'),
('Normal User', '123456', 'user');

-- -----------------------------
-- Ticket ตัวอย่าง
-- -----------------------------
INSERT INTO ticket (title, description, priority, status, assigned_to, user_id)
VALUES
('Cannot login to system', 'User cannot login to the IT support portal', 'high', 'open', 2, 3),
('Printer not working', 'The printer in room 101 is jammed', 'medium', 'in_progress', 2, 3),
('Software installation request', 'Request to install Adobe Photoshop', 'low', 'resolved', 2, 3);

-- -----------------------------
-- Comment ตัวอย่าง
-- -----------------------------
INSERT INTO comment (message, ticket_id, user_id)
VALUES
('We are looking into this issue.', 1, 2),
('Issue fixed, please check.', 3, 2),
('Assigned to staff for follow up.', 2, 2);

-- -----------------------------
-- Ticket Attachments ตัวอย่าง
-- -----------------------------
INSERT INTO ticket_attachments (file_path, ticket_id)
VALUES
('/uploads/screenshot1.png', 1),
('/uploads/error_log.txt', 2),
('/uploads/request_form.pdf', 3);
