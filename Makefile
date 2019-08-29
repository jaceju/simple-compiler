.PHONY: serve

serve:
	docker run -d --rm -v ${PWD}:/gitbook -p 4000:4000 jaceju/gitbook serve docs

build:
	docker run --rm -v ${PWD}:/gitbook jaceju/gitbook install docs
	docker run --rm -v ${PWD}:/gitbook jaceju/gitbook build docs ./build
	cp -R build/* public/
	rm -rf build
	cd public/ && git add . && git commit -m "Update" && git push && cd ../
