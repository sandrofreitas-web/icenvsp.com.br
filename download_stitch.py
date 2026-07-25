import urllib.request
import os

screens = [
    {
        "name": "Cultos_e_Horarios",
        "html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQxMWYzNDFmMjY5ODQ1M2E5MmRmMDg4YTI5ZDI2NGE2EgsSBxCUwun7iwsYAZIBIwoKcHJvamVjdF9pZBIVQhM3MTU1MTg5MTEyOTk5MDI4MTcz&filename=&opi=89354086",
        "img": "https://lh3.googleusercontent.com/aida/AP1WRLsm4I0A4X4Nuw3GGlTLghvxlfJc-7HMhHXSH7Ofm4ee6XkTdL3-k9LZQcV4AkU8hW9LJCy6dpm0zVzk1SANw1m6ydttYc1VrdiOUZkmwFTHwHxmimyJkitPJ0PE70xGITARlTytWTpRlZfUUkq1IePCku4RRMyt_0vsIniLNocoPVCgeFHOE2WyOZcGwoOkcsUMPCDCpEiGhVxt1SIQe7QDgFQb7QwL8VSjQuiqcQLLbiONpR09hTih7uo"
    },
    {
        "name": "Sermoes_e_Mensagens",
        "html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzczNDUwYzFiZjFhNTQ4OWM4YjQ1NmQ4NGJjNjkyYWIzEgsSBxCUwun7iwsYAZIBIwoKcHJvamVjdF9pZBIVQhM3MTU1MTg5MTEyOTk5MDI4MTcz&filename=&opi=89354086",
        "img": "https://lh3.googleusercontent.com/aida/AP1WRLsbUiGtRY_AsXoZIqhENKaoX9VBjBGo7S9vu_OdJ148qvqxHh2XHBeXUhrLOUAcoOtuorIpYA6SjXmIMRGRe-Nl_G0mf6H9We0zy4D6LOe_KkbiFDWXm3mG9hBv5MMK6yQJVPoWPRrUYrgOruOjRxbxga30A7Tg54YNWWcyBRT2sWzKRRIrZY5r5pKx13kFaolDx_1kKcQTMu7NRmObAIpeTJU9nbaO9PafqfL-3AnPstohD5eq-4kiTg"
    },
    {
        "name": "Agenda_de_Eventos",
        "html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2I3NDA0MzQ4NjUzZjQzOWNiMjE4MjA3MzZkM2IyNmYzEgsSBxCUwun7iwsYAZIBIwoKcHJvamVjdF9pZBIVQhM3MTU1MTg5MTEyOTk5MDI4MTcz&filename=&opi=89354086",
        "img": "https://lh3.googleusercontent.com/aida/AP1WRLtLiUF8f79Kbp-ftWgSMOAOJEzAqsAGTchnGC4GPmzGbdvjH3WX6-JdRzU-1srptmLkWuOL_Hn2GwYKSfg8XhBKfWZ638Q-raLvMWsF4D_IjZxgM2btLiVEbS0GlNc20MaDJcd2ztTClwqKOErJTBTxclpfZM04o-iqVnpkIyMzg1KjT2uKPfVFXExQcOiU1b-wlNGIimFSVjpb68yMsXyfihEEwY1fZVkcHs4hODFUpCJQL4mFGPidZOY"
    },
    {
        "name": "Contato",
        "html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQ5MmFhNjA1MDkyNDQyMjg5ZmQ2MDRmNzBkNWExNGQ1EgsSBxCUwun7iwsYAZIBIwoKcHJvamVjdF9pZBIVQhM3MTU1MTg5MTEyOTk5MDI4MTcz&filename=&opi=89354086",
        "img": "https://lh3.googleusercontent.com/aida/AP1WRLsT01thbtOBB0Px9Bx_gHxoEFkGDoIEfbfe_zPQJGEnsCKRiu4GdQ5xPqJyhhoG56qREbmgbCyaHQjEkVfKAp7d4inMgSXtGAl9VW42k2dqS4rwM9jfYUbNB-NFAGl4jVJwEtoMh-W5GHimdabrbaT3j01fWsJHVibEWANLx0vvKopxkCZQKi67lyda-u5ZzODjI3SmqoUU5PZpkJ0ysvKEQhg-kwTcea5J8qxxTZbaYk2i2Cytqc-wkxo"
    }
]

out_dir = r"c:\Docker\igreja-crist-evan\stitch_downloads"
os.makedirs(out_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0'}

for s in screens:
    print(f"Downloading {s['name']} HTML & PNG...")
    req_html = urllib.request.Request(s['html'], headers=headers)
    with urllib.request.urlopen(req_html) as resp, open(os.path.join(out_dir, f"{s['name']}.html"), 'wb') as f:
        f.write(resp.read())
    
    req_img = urllib.request.Request(s['img'], headers=headers)
    with urllib.request.urlopen(req_img) as resp, open(os.path.join(out_dir, f"{s['name']}.png"), 'wb') as f:
        f.write(resp.read())

print("All downloads completed successfully!")
