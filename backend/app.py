from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import math

app = Flask(__name__)
CORS(app)

@app.route('/generate-plan', methods=['POST'])
def generate_plan():
    data = request.json
    subjects = data['subjects']  # [{ name, chapters }]
    exam_dates = data['exam_dates']  # { subject: 'YYYY-MM-DD' }
    hours_per_day = int(data['hours_per_day'])

    today = datetime.today()
    plan = {}

    for subject in subjects:
        name = subject['name']
        chapters = subject['chapters']
        total_chapters = len(chapters)
        exam_date = datetime.strptime(exam_dates[name], '%Y-%m-%d')
        days_left = (exam_date - today).days

        if days_left <= 0:
            continue

        chapters_per_day = math.ceil(total_chapters / days_left)
        date = today

        for chapter in chapters:
            if date > exam_date:
                break
            date_str = date.strftime('%Y-%m-%d')
            if date_str not in plan:
                plan[date_str] = []
            plan[date_str].append(f"{name}: {chapter}")
            if len(plan[date_str]) >= chapters_per_day:
                date += timedelta(days=1)

    return jsonify(plan)

if __name__ == '__main__':
    app.run(debug=True)
