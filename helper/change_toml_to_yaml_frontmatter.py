from pathlib import Path


def main():
    p = Path("site/content")

    for path in p.glob("**/*.md"):
        print(path)

        state = 0

        with open(path) as f:
            content = f.read()
            lines = content.split("\n")
            for i in range(len(lines)):
                if state == 1:
                    lines[i] = lines[i].replace(" = ", ": ")

                if "+++" in lines[i]:
                    lines[i] = lines[i].replace("+++", "---")
                    state += 1

                if state == 2:
                    break

            result = "\n".join(lines)
        with open(path, "w") as f:
            f.write(result)


if __name__ == '__main__':
    main()
