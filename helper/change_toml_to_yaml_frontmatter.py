from pathlib import Path


def main():
    p = Path("site/content")
    for path in p.glob("**/*.md"):
        print(path)

        with open(path) as f:
            content = f.read()
            lines = content.split("\n")
            for i in range(len(lines)):
                lines[i] = lines[i].replace("+++", "---")
                lines[i] = lines[i].replace(" = ", ": ")

            result = "\n".join(lines)
        with open(path, "w") as f:
            f.write(result)


if __name__ == '__main__':
    main()
