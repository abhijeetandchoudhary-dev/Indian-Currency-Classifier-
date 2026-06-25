from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER, TA_LEFT
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer

BASE_DIR = Path(__file__).resolve().parent
SOURCE = BASE_DIR / 'report_draft.md'
OUTPUT = BASE_DIR / 'IEEE_Report.pdf'

text = SOURCE.read_text(encoding='utf-8')
lines = text.splitlines()

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name='IEEEHeading1',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=16,
    leading=18,
    alignment=TA_CENTER,
    spaceAfter=10,
))
styles.add(ParagraphStyle(
    name='IEEEHeading2',
    parent=styles['Heading2'],
    fontName='Helvetica-Bold',
    fontSize=12,
    leading=14,
    alignment=TA_LEFT,
    spaceAfter=6,
))
styles.add(ParagraphStyle(
    name='IEEEBody',
    parent=styles['BodyText'],
    fontName='Helvetica',
    fontSize=10.5,
    leading=13,
    alignment=TA_JUSTIFY,
    spaceAfter=6,
))
styles.add(ParagraphStyle(
    name='IEEEList',
    parent=styles['BodyText'],
    fontName='Helvetica',
    fontSize=10.5,
    leading=13,
    alignment=TA_LEFT,
    leftIndent=18,
    spaceAfter=4,
))
styles.add(ParagraphStyle(
    name='IEEECenter',
    parent=styles['BodyText'],
    fontName='Helvetica',
    fontSize=10.5,
    leading=13,
    alignment=TA_CENTER,
    spaceAfter=6,
))

story = []

for raw in lines:
    line = raw.rstrip()
    stripped = line.strip()
    if not stripped:
        story.append(Spacer(1, 4))
        continue

    if stripped.startswith('# '):
        story.append(Paragraph(stripped[2:], styles['IEEEHeading1']))
    elif stripped.startswith('## '):
        heading = stripped[3:]
        if heading.startswith('Title Page Content') or heading.startswith('Certificate') or heading.startswith('Declaration') or heading.startswith('Acknowledgement'):
            story.append(Paragraph(heading, styles['IEEEHeading2']))
        else:
            story.append(Paragraph(heading, styles['IEEEHeading2']))
    elif stripped.startswith('- '):
        story.append(Paragraph(f"• {stripped[2:]}", styles['IEEEList']))
    elif stripped.startswith('**') and stripped.endswith('**'):
        story.append(Paragraph(stripped.strip('*'), styles['IEEECenter']))
    else:
        # Keep numbered section labels on their own line as normal text.
        story.append(Paragraph(stripped, styles['IEEEBody']))

# Build PDF
pdf = SimpleDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    rightMargin=0.8 * inch,
    leftMargin=0.8 * inch,
    topMargin=0.8 * inch,
    bottomMargin=0.8 * inch,
)
pdf.build(story)

print(f'Created {OUTPUT.resolve()}')
