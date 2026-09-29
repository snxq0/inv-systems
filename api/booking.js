import nodemailer from "nodemailer";


function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


export default async function handler(req, res) {

    // Only POST requests are allowed
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }


    try {

        const {
            name,
            email,
            company,
            service,
            message
        } = req.body;


        // Validate required fields
        if (!name || !email || !service || !message) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }


        // Create SMTP transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.strato.de",
            port: 465,
            secure: true,

            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });


        // Send email
        await transporter.sendMail({

            from: `"INV" <${process.env.SMTP_USER}>`,

            to: process.env.BOOKING_EMAIL,

            replyTo: email,

            subject: `New inquiry — ${service}`,

            text: `
New inquiry from INV website

Name: ${name}
E-Mail: ${email}
Company: ${company || "Not provided"}
Service: ${service}

Message:
${message}

--------------------------------

INV
Minimalism is the loudest.
https://inv-systems.com
            `,

            html: `
<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>INV — New Inquiry</title>

</head>


<body style="
    margin: 0;
    padding: 40px 20px;
    background-color: #111111;
    font-family: Arial, Helvetica, sans-serif;
    color: #f2f2f0;
">


    <div style="
        max-width: 680px;
        margin: 0 auto;
        background-color: #171717;
        border: 1px solid #2a2a2a;
    ">


        <!-- HEADER -->

        <div style="
            padding: 32px;
            border-bottom: 1px solid #2a2a2a;
        ">

            <div style="
                font-size: 28px;
                font-weight: 700;
                letter-spacing: -1px;
                color: #f2f2f0;
            ">
                INV
            </div>


            <div style="
                margin-top: 8px;
                font-size: 12px;
                letter-spacing: 2px;
                text-transform: uppercase;
                color: #5b4b78;
            ">
                New inquiry
            </div>

        </div>


        <!-- CONTENT -->

        <div style="
            padding: 32px;
        ">


            <div style="
                margin-bottom: 28px;
                font-size: 14px;
                line-height: 1.6;
                color: #a3a3a3;
            ">

                A new inquiry was submitted through

                <strong style="
                    color: #f2f2f0;
                ">
                    inv-systems.com
                </strong>.

            </div>


            <!-- DETAILS -->

            <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                    border-collapse: collapse;
                "
            >


                <!-- NAME -->

                <tr>

                    <td style="
                        padding: 14px 0;
                        width: 35%;
                        border-bottom: 1px solid #2a2a2a;
                        color: #a3a3a3;
                        font-size: 13px;
                    ">
                        Name
                    </td>


                    <td style="
                        padding: 14px 0;
                        border-bottom: 1px solid #2a2a2a;
                        color: #f2f2f0;
                        font-size: 14px;
                    ">
                        ${escapeHtml(name)}
                    </td>

                </tr>


                <!-- EMAIL -->

                <tr>

                    <td style="
                        padding: 14px 0;
                        width: 35%;
                        border-bottom: 1px solid #2a2a2a;
                        color: #a3a3a3;
                        font-size: 13px;
                    ">
                        E-Mail
                    </td>


                    <td style="
                        padding: 14px 0;
                        border-bottom: 1px solid #2a2a2a;
                        font-size: 14px;
                    ">

                        <a
                            href="mailto:${escapeHtml(email)}"
                            style="
                                color: #f2f2f0;
                                text-decoration: none;
                            "
                        >
                            ${escapeHtml(email)}
                        </a>

                    </td>

                </tr>


                <!-- COMPANY -->

                <tr>

                    <td style="
                        padding: 14px 0;
                        width: 35%;
                        border-bottom: 1px solid #2a2a2a;
                        color: #a3a3a3;
                        font-size: 13px;
                    ">
                        Company
                    </td>


                    <td style="
                        padding: 14px 0;
                        border-bottom: 1px solid #2a2a2a;
                        color: #f2f2f0;
                        font-size: 14px;
                    ">
                        ${escapeHtml(company || "Not provided")}
                    </td>

                </tr>


                <!-- SERVICE -->

                <tr>

                    <td style="
                        padding: 14px 0;
                        width: 35%;
                        color: #a3a3a3;
                        font-size: 13px;
                    ">
                        Service
                    </td>


                    <td style="
                        padding: 14px 0;
                        color: #f2f2f0;
                        font-size: 14px;
                    ">
                        ${escapeHtml(service)}
                    </td>

                </tr>


            </table>


            <!-- MESSAGE -->

            <div style="
                margin-top: 36px;
            ">


                <div style="
                    margin-bottom: 12px;
                    font-size: 12px;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    color: #5b4b78;
                ">
                    Message
                </div>


                <div style="
                    padding: 20px;
                    background-color: #111111;
                    border: 1px solid #2a2a2a;
                    color: #f2f2f0;
                    font-size: 15px;
                    line-height: 1.6;
                    white-space: pre-line;
                ">
                    ${escapeHtml(message)}
                </div>


            </div>


        </div>


        <!-- FOOTER -->

        <div style="
            padding: 24px 32px;
            border-top: 1px solid #2a2a2a;
            color: #666666;
            font-size: 11px;
            line-height: 1.6;
            letter-spacing: 0.5px;
        ">

            INV — Minimalism is the loudest.

            <br>

            inv-systems.com

        </div>


    </div>


</body>

</html>
            `
        });


        // Success response

        return res.status(200).json({
            success: true
        });


    } catch (error) {

        console.error("Booking error:", error);


        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }

}