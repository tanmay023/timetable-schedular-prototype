import sys
import json
from ortools.sat.python import cp_model

def solve_timetable(data):
    model = cp_model.CpModel()

    all_faculties = {f['_id']: f for f in data['faculties']}
    all_subjects = {s['_id']: s for s in data['subjects']}
    all_rooms = {r['_id']: r for r in data['rooms']}
    all_batches = {b['_id']: b for b in data['batches']}
    
    timeslots = [f'{day}_{hour:02d}' for day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] for hour in range(9, 16)]

    class_vars = {}
    for b_id, batch in all_batches.items():
        for s_id in batch['subjects']:
            subject = all_subjects[s_id]
            qualified_faculties = [f_id for f_id, fac in all_faculties.items() if s_id in fac.get('qualifications', [])]
            for f_id in qualified_faculties:
                for r_id in all_rooms:
                    for t in timeslots:
                        class_vars[(b_id, s_id, f_id, r_id, t)] = model.NewBoolVar(f'class_{b_id}_{s_id}_{f_id}_{r_id}_{t}')

    for b_id, batch in all_batches.items():
        for s_id in batch['subjects']:
            subject = all_subjects[s_id]
            required_hours = subject.get('lectureHours', 0) + subject.get('labHours', 0)
            model.Add(sum(class_vars.get((b_id, s_id, f_id, r_id, t)) 
                          for f_id, fac in all_faculties.items() if s_id in fac.get('qualifications', [])
                          for r_id in all_rooms
                          for t in timeslots if (b_id, s_id, f_id, r_id, t) in class_vars) == required_hours)
    
    for t in timeslots:
        for f_id in all_faculties:
            model.AddAtMostOne(class_vars[key] for key in class_vars if key[2] == f_id and key[4] == t)
        for r_id in all_rooms:
            model.AddAtMostOne(class_vars[key] for key in class_vars if key[3] == r_id and key[4] == t)
        for b_id in all_batches:
            model.AddAtMostOne(class_vars[key] for key in class_vars if key[0] == b_id and key[4] == t)

    solver = cp_model.CpSolver()
    status = solver.Solve(model)

    solution = []
    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
        for (b_id, s_id, f_id, r_id, t), var in class_vars.items():
            if solver.BooleanValue(var):
                solution.append({
                    "batch": all_batches[b_id]['name'],
                    "subject": all_subjects[s_id]['name'],
                    "faculty": all_faculties[f_id]['name'],
                    "room": all_rooms[r_id]['name'],
                    "timeslot": t
                })
    
    print(json.dumps({"schedule": sorted(solution, key=lambda x: x['timeslot'])}))

if __name__ == '__main__':
    input_json = sys.argv[1]
    data = json.loads(input_json)
    solve_timetable(data)